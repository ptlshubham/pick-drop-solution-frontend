import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class BasicDetailsService {

    constructor(private http: HttpClient) { }

    public getStateFromJson(): Observable<any[]> {
        return this.http.get<any[]>('assets/json/states-and-districts.json');
    }

}
