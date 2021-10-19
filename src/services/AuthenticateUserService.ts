import axios from "axios";

/**
 * Receber o code por string
 * Recuperar o access token do github
 * Recuperar infos do User no github
 * Verificar se o user existe no BD
 *  if sim => gerar token
 *  else cria user no BD e gera o token
 * Retorna o token com as infos de user
 */

interface IAccessTokenResponse{
  access_token: string
}

interface IUserResponse{
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AuthenticateUserService{
  async execute(code: string){
    const url = "https://github.com/login/oauth/access_token";

    const {data: accessTokenResponse} 
    = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,

      },
      headers: {
        "Accept": "application/json"
      }
    });

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers:{
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    });

    return response.data;
  }


}

export {AuthenticateUserService}