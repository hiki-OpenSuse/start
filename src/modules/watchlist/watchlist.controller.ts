import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createAssetResponse } from './response/index';
import { WatchlistService } from './watchlist.service';
import { JwtAuthGuard } from './../../guards/jwt-guard';
import { WatchListDTO } from './dto/index';
import { Body, Controller, Post, Req, UseGuards, Delete, Query } from '@nestjs/common';

@Controller('watchlist')
export class WatchlistController {
    constructor (private readonly watchlistService: WatchlistService){}

    @ApiTags('API')
    @ApiResponse({status: 201, type: createAssetResponse})
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset (@Body() assetDto: WatchListDTO, @Req() request): Promise<createAssetResponse> {
    const user = request.user
    return this.watchlistService.createAsset(user, assetDto)
    }

    @ApiTags('API')
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAsset (@Query('id') assetID: string, @Req() request): Promise<boolean> {
        const {id} = request.user 
        return this.watchlistService.deleteAsset(id, assetID)
    }
}