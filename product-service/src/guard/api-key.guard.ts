import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        const validApiKey = this.configService.get<string>('product_service.internal_api_key');
        if (apiKey !== validApiKey) {
            throw new UnauthorizedException('Invalid API Key');
        }

        return true;
    }
}
