import { CacheInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CloudStorageService } from './cloud-storage.service';

@Module({
  imports: [],
  providers: [
    CloudStorageService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [CloudStorageService],
})
export class GcpstorageModule {}
