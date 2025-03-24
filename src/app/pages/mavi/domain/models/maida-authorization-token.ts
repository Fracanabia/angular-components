export interface MaidaAuthorizationTokenResponse {
   access_token: string;
   token_type: string;
}

export class MaidaAuthorizationToken {
   accessToken: string;
   tokenType: string;

   constructor(init: MaidaAuthorizationTokenResponse) {
      /* Mapear atributos para camelCase */
      this.accessToken = init?.access_token;
      this.tokenType = init?.token_type;
   }

}
