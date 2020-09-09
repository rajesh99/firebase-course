import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
    providedIn: 'root'
})
export class ResourcesService<T, U> {

    constructor(private db: AngularFirestore) { }

    saveResource(resourceId: string, changes: Partial<T>): Observable<any> {
        return from(this.db.doc(`courses/${resourceId}`).update(changes));
    }

    loadAllResources(): Observable<T[]> {
        return this.db.collection(
            'courses',
            ref => ref.orderBy('seqNo')
        )
            .snapshotChanges()
            .pipe(
                map(snaps => convertSnaps<T>(snaps)),
                first());
    }


    findResourceByUrl(resourceUrl: string): Observable<T> {
        return this.db.collection('courses',
            ref => ref.where('url', '==', resourceUrl))
            .snapshotChanges()
            .pipe(
                map(snaps => {

                    const resources = convertSnaps<T>(snaps);

                    return resources.length === 1 ? resources[0] : undefined;
                }),
                first()
            );
    }

    findLessonsByResourceId(resourceId: string, sortOrder: OrderByDirection = 'asc',
        pageNumber = 0, pageSize = 3): Observable<U[]> {

        return this.db.collection(`courses/${resourceId}/lessons`,
            ref => ref.orderBy('seqNo', sortOrder)
                .limit(pageSize)
                .startAfter(pageNumber * pageSize))
            .snapshotChanges()
            .pipe(
                map(snaps => convertSnaps<U>(snaps)),
                first()
            );

    }
}





















