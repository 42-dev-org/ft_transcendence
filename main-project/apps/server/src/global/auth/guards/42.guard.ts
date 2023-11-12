import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { IntraSignInPayload, IntraTokenPayload } from "../types/auth";
import axios from "axios";

@Injectable()
export class Auth42Guard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  private async validateRequest(req: Request): Promise<boolean> {
    const code = req.query["code"];

    if (!code) return false;

    try {
      const { access_token } = await this.getAccessToken(code as string);

      const user = await this.getUser(access_token);
      req.user = user;
    } catch (error) {
      return false;
    }
    return true;
  }

  private async getAccessToken(code: string): Promise<IntraTokenPayload> {
    const { data } = await axios.post<IntraTokenPayload>(
      "https://api.intra.42.fr/oauth/token",
      {
        grant_type: "authorization_code",
        client_id:
          "u-s4t2ud-0ba76f9d090b025cccb77b6ad010b154e1a9ca1b8b466a0c0e3f9b7101321393",
        code,
        client_secret:
          "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",
        redirect_uri: "http://localhost:8080/api/v1/42oauth",
      }
    );

    return data;
  }

  private async getUser(access_token: string): Promise<IntraSignInPayload> {
    const { data: userData } = await axios.get<IntraSignInPayload>(
      "https://api.intra.42.fr/v2/me",
      {
        headers: { Authorization: "Bearer " + access_token },
      }
    );
    const { email, login, first_name, last_name, url, phone, kind, image } =
      userData;
    return {
      email,
      login,
      first_name,
      last_name,
      url,
      phone,
      kind,
      image,
    };
  }
}
