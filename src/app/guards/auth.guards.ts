import { inject } from "@angular/core";
import { DatapassingService } from "../Services/datapassing.service";
import { ActivatedRoute, Router } from "@angular/router";


export function jobDetails() {
    const data = inject(DatapassingService);
    const route = inject(Router);
    const active = inject(ActivatedRoute);
    let jobID: number = 0;

    active.paramMap.subscribe((res) => {
         jobID=+res.get('id');
    })

    if (!data.isAuthenticated) {
       route.navigateByUrl("/login/"+jobID);
    }

    return data.isAuthenticated;
}

export function jobApply() {
    const route = inject(Router);
    return true;
}