import { NgModule } from "@angular/core";

//NG ZORRO IMPORTS
import {NzSpinModule}from 'ng-zorro-antd/spin'
import{NzFormModule}from 'ng-zorro-antd/form'
import{NzButtonModule}from 'ng-zorro-antd/button'
import{NzInputModule}from 'ng-zorro-antd/input'
import{NzLayoutModule}from 'ng-zorro-antd/layout'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTableModule } from 'ng-zorro-antd/table';



@NgModule({
    exports: [
        NzSpinModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzLayoutModule,
        NzSelectModule,
        NzDatePickerModule,
        NzTimePickerModule,
        NzTableModule
    
    ]
})
export class NgZorroImportsModule {}