import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './modules/media/media.module';
import { GcpstorageModule } from './core/Services/gcp/cloud-storage.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 5 * 60, // 5 minutes
      max: 100, // 100 as maximum number of items in cache
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MediaModule,
    GcpstorageModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
