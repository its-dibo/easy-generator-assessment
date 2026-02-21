import { BasicEntity } from '#utils/basic.entity.js';
import { Column, Entity } from 'typeorm';

/**
 * a list of allow list of the active auth tokens
 * so the user cannot access the resources with a revoked token even if it is valid
 */
@Entity('tokens')
export class Token extends BasicEntity {
  /**
   * a random UUID hash that stored in payload.tokenId,
   * when the JWT token is validated, the tokenId is extracted from it,
   * and then checked if it existing here, to revoke a token just remove its corresponding tokenId from here.
   * Avoid storing the token itself here, so no one can use it without permission
   */
  @Column({ nullable: false, type: 'text', unique: true })
  tokenId: string;
}
