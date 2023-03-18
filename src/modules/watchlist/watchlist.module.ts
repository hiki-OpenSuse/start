import { Watchlist } from './models/watchlist.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';

@Module({
  imports: [SequelizeModule.forFeature([Watchlist])],
  controllers: [WatchlistController],
  providers: [WatchlistService]
})
export class WatchlistModule {}
