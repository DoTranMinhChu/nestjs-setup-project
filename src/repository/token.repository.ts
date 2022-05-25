import { TokenEntity } from '@data/entity/token.entity';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(TokenEntity)
export class TokenRepository extends Repository<TokenEntity> {
  async issueToken(
    userId: string,
    expiresOn: number,
    agent: string,
  ): Promise<TokenEntity> {
    const token = new TokenEntity();
    token.userId = userId;
    token.validUntil = new Date().getTime() + expiresOn;
    token.agent = agent;

    return await this.save(token);
  }

  async revokeToken(userId: string, refreshToken: string): Promise<void> {
    await this.delete({
      userId,
      id: refreshToken,
    });
  }

  async findTokenByIdAndUserId(
    userId: string,
    id: string,
  ): Promise<TokenEntity> {
    return await this.findOne({ id, userId });
  }
}
