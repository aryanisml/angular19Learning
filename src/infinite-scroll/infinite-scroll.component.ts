import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../services/product.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-infinite-scroll',
    templateUrl: './infinite-scroll.component.html',
    styleUrls : ['./infinite-scroll.component.css'],
    standalone :true,
    imports: [CommonModule],
    providers :[HttpClient]
})

export class InfiniteScroll implements OnInit {
    items = signal<any[]>([]); // Correct declaration for an array signal
    skip = signal(0);
    limit = 10;
    isLoading = signal(false);
    allDataLoaded = signal(false);

    constructor(private productService : ProductService) { }

    ngOnInit() { 
        this.loadItems();
    }

    loadItems() {
        if (this.isLoading() || this.allDataLoaded()) {
            return;
          }
        this.isLoading.set(true);
        this.productService.getProduct(this.skip(), this.limit)
                           .pipe(
                            tap((response)=>{
                                if (response && response.products.length > 0) {
                                    /// update signal 
                                 this.items.update((prev)=> [...prev, ...response.products] );
                                 this.skip.update((prev)=> prev+ this.limit);
                                }else {
                                    this.allDataLoaded.set(true);
                                    console.log('all data has been loaded')
                                }
                            }),
                            catchError((error)=>{
                                    return of();
                            }),
                            finalize(()=>{
                            this.isLoading.set(false);
                            })
                           )
                           .subscribe()
    }

    handleScroll(event: Event) {
        const target = event.target as HTMLElement;
        if (target?.scrollTop + target?.clientHeight >= target?.scrollHeight - 50) {
            this.loadItems();
        }
    }
}