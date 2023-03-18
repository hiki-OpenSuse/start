import { Injectable } from '@nestjs/common';
import { Watchlist } from './models/watchlist.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WatchlistService {
    constructor (@InjectModel(Watchlist) private readonly watchlistRepository: typeof Watchlist) {}

    async createAsset (user, dto){
    try {
      const watchlist = {
        user: user.id,
        name: dto.name,
        assetId: dto.assetId
      }
      await this.watchlistRepository.create(watchlist)
      return watchlist
    } catch (e) {
      throw new Error(e)
    }
  }

  async deleteAsset (userId: number, assetId: string ): Promise<boolean> {
    try {
      await this.watchlistRepository.destroy({ where: { id: assetId, user: userId } })
      return true
    } catch (e) {
      throw new Error(e)
    }
  }
}