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
          "u-s4t2ud-e9ef34cb474eec70b251774667b8102881013a0927960d2bcefe143797da568e",
        code,
        client_secret:
          "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",
        redirect_uri: "http://localhost:8080/api/v1/auth/42",
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
