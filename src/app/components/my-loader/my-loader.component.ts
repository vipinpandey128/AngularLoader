import { Component, OnInit } from '@angular/core';
import {LoaderService} from '../../services/loader.service'

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.css']
})
export class MyLoaderComponent implements OnInit {

  loading: boolean;


  constructor(private loader: LoaderService) { 

    this.loader.isLoading.subscribe((v)=>{
      this.loading = v;
    })
  }

  ngOnInit(): void {
  }

}
