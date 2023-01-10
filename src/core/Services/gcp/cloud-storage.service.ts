import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { StorageFile } from '../../../shared/Interfaces/storage-file';
import {
  Bucket,
  DownloadResponse,
  GetSignedUrlConfig,
  Storage,
} from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { File } from 'src/shared/Interfaces/file.interface';

@Injectable()
export class CloudStorageService {
  private storage: Storage;
  private bucket: Bucket;

  constructor(
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.storage = new Storage({
      projectId: this.configService.get('PROJECT_ID'),
      credentials: {
        client_email: this.configService.get('CLIENT_EMAIL'),
        private_key: this.configService.get('PRIVATE_KEY'),
      },
    });

    this.bucket = this.storage.bucket(
      this.configService.get('STORAGE_MEDIA_BUCKET'),
    );
  }
  private setDestination(destination: string): string {
    let escDestination = '';
    escDestination += destination
      .replace(/^\.+/g, '')
      .replace(/^\/+|\/+$/g, '');
    if (escDestination !== '') escDestination = escDestination + '/';
    return escDestination;
  }

  private setFilename(file: File): string {
    const filename = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const extention: string = extname(file.originalname);
    return `${filename}${extention}`;
  }

  async save(uploadedFile: File, destination: string): Promise<string> {
    // 1- These will generate a right pattern + safe file name

    const fileName =
      this.setDestination(destination) + this.setFilename(uploadedFile);
    const contentType = uploadedFile.mimetype;

    const file = this.bucket.file(fileName);

    try {
      // 2- upload file to GCP Storae
      await file.save(uploadedFile.buffer, { contentType });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
    return fileName;
  }
  async getSignedUrl(fileName: string) {
    try {
      // 1- These options will allow temporary read access to the file
      const expirtionTTL =
        Number(this.configService.get('URL_EXPIRATION_IN_SECONDS')) || 5000;
      console.log('expirtionTTL', expirtionTTL);

      const options: GetSignedUrlConfig = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + expirtionTTL, // 5 * 60 * 1000 = 5 minutes
      };

      // 2- Get a v4 signed URL for reading the file
      const [url] = await this.bucket.file(fileName).getSignedUrl(options);

      console.log('url', url);
      return url;
    } catch (error) {
      console.log('error', error);
    }
  }

  async get(path: string): Promise<StorageFile> {
    const fileResponse: DownloadResponse = await this.bucket
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  async delete(path: string) {
    await this.bucket.file(path).delete({ ignoreNotFound: true });
  }
}
