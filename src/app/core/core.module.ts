import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Configs


// Interceptors
// import { ErrorInterceptor } from './interceptors/error.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptors';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Services
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { HomelessService } from './services/homeless.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    UserService,
    AuthService,
    HomelessService,
    LocalStorageService,
  ],
})
export class CoreModule {}
