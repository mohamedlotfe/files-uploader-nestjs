import { Module } from '@nestjs/common';
import { GcpstorageModule } from 'src/core/Services/gcp/cloud-storage.module';
import { MediaController } from './media.controller';

@Module({
  imports: [GcpstorageModule],
  controllers: [MediaController],
})
export class MediaModule {}
