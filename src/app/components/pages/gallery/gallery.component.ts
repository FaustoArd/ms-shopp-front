import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/model/Item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private itemService:ItemService,private route:ActivatedRoute){}

  items: Item[] = [];
  item!:Item;

ngOnInit(): void {
    this.getBySearch();
}

  getBySearch(){
    const search = this.route.snapshot.paramMap.get('search');
    this.itemService.getItemsBySearch(search as string).subscribe({
      next:(itemsData)=>{
        this.items = itemsData;
      },
      error:(errorData)=>{
        console.log(errorData);
      }
    })
  }


}
