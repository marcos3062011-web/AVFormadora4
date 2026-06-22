import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardContent, IonImg, IonButton, IonRow, IonSpinner, IonCardHeader, IonCardSubtitle, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonImg, IonButton, IonRow, IonSpinner, IonCardHeader, IonCardSubtitle, CommonModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel]
})


export class Tab1Page implements OnInit {
  
  products: Product[] = [];
  currentIndex: number = 0; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Product[]>('https://fakestoreapi.com/products')
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Erro ao buscar produtos:', error);
        }
      });
  }

  nextProduct() {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
    }
  }

  prevProduct() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}

