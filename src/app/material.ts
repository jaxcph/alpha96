import { MatButtonModule, 
         MatSidenavModule, 
         MatCardModule,
         MatTabsModule,
         MatInputModule,
         MatIconModule,
         MatTableModule,
                         } from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';                         
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule,
        MatSidenavModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        CdkTableModule
    ],
    exports: [
        MatButtonModule,
        MatSidenavModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        CdkTableModule
  
    ]
})

export class MaterialModule { }