import { Injectable } from '@nestjs/common';
import { Watchlist } from './models/watchlist.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WatchlistService {
    constructor (@InjectModel(Watchlist) private readonly watchlistRepository: typeof Watchlist) {}

    async createAsset (user, dto){
      console.log(user)
    const watchlist = {
      user: user.id,
      name: dto.name,
      assetId: dto.assetId
    }
    await this.watchlistRepository.create(watchlist)
    return watchlist
  }

  async deleteAsset (userId: number, assetId: string ): Promise<boolean> {
    await this.watchlistRepository.destroy({ where: { id: assetId, user: userId } })
    return true
  }
}