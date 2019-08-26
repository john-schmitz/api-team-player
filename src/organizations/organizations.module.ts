import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';
import { MatchesModule } from '../matches/matches.module';
import { Event } from '../events/event.entity';
import { Match } from '../matches/match.entity';
import { Competition } from '../competitions/competition.entity';
import { ImageUploadModule } from '../image-upload/image-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    TypeOrmModule.forFeature([Event]),
    TypeOrmModule.forFeature([Match]),
    TypeOrmModule.forFeature([Competition]),
    MatchesModule,
    ImageUploadModule,
  ],
  providers: [OrganizationsService],
  controllers: [OrganizationsController],
})
export class OrganizationsModule {}
