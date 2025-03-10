import {Injectable} from '@angular/core';
import {IAuthority, ILogInResponse, IRequestLogIn, IRequestUser, IRoleType, IUser} from '../interfaces';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken!: string;
  private expiresIn!: number;
  private user: IUser = {email: '', authorities: []};

  constructor(private http: HttpClient) {
    this.load();
  }

  public save(): void {
    if (this.user) localStorage.setItem('auth_user', JSON.stringify(this.user));
    if (this.accessToken) localStorage.setItem('access_token', JSON.stringify(this.accessToken));
    if (this.expiresIn) localStorage.setItem('expiresIn', JSON.stringify(this.expiresIn));
  }

  private load(): void {
    let token = localStorage.getItem('access_token');
    if (token) this.accessToken = token;
    let exp = localStorage.getItem('expiresIn');
    if (exp) this.expiresIn = JSON.parse(exp);
    const user = localStorage.getItem('auth_user');
    if (user) this.user = JSON.parse(user);
  }

  public getUser(): IUser | undefined {
    return this.user;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public check(): string {
    return this.accessToken;
  }

  public login(user: IRequestLogIn): Observable<ILogInResponse> {
    return this.http.post<ILogInResponse>('api/users/logIn', user).pipe(
      tap((response: any) => {
        this.accessToken = response.token;
        this.user.email = user.email;
        this.expiresIn = response.expiresIn;
        this.user = response.authUser;
        this.save();
      })
    );
  }

  public hasRole(role: string): boolean {
    return this.user.authorities ? this.user?.authorities.some(authority => authority.authority == role) : false;
  }

  public isSuperAdmin(): boolean {
    return this.user?.authorities?.some(authority => authority.authority === IRoleType.admin) ?? false;
  }

  public hasAnyRole(roles: any[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  public getPermittedRoutes(routes: any[]): any[] {
    let permittedRoutes: any[] = [];
    for (const route of routes) {
      if (route.data && route.data.authorities) {
        if (this.hasAnyRole(route.data.authorities)) {
          permittedRoutes.push(route);
        }
      }
    }
    return permittedRoutes;
  }


  public signup(user: IRequestUser): Observable<ILogInResponse> {
    return this.http.post<ILogInResponse>('api/users/signUp', user);
  }

  public logout() {
    this.accessToken = '';
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('auth_user');
  }

  public getUserAuthorities(): IAuthority[] | undefined {
    return this.getUser()?.authorities ? this.getUser()?.authorities : [];
  }

  public areActionsAvailable(routeAuthorities: string[]): boolean {
    let allowedUser: boolean = false;
    let isAdmin: boolean = false;
    let userAuthorities = this.getUserAuthorities();

    for (const authority of routeAuthorities) {
      if (userAuthorities?.some(item => item.authority == authority)) {
        allowedUser = true;
        break;
      }
    }

    if (userAuthorities?.some(item => item.authority == IRoleType.admin)) {
      isAdmin = true;
    }

    return allowedUser && isAdmin;
  }
}
