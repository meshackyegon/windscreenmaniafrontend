import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

interface Order {
  approval_time: string;
  services: Service[];
  [key: string]: any;
}

interface Service {
  name: string;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  constructor(private apiService: ApiService, private router: Router, private sharedService: SharedService) {}


  ngOnInit(): void {
    this.fetchOrders();
  }
  
  fetchOrders(): void {
    this.apiService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders.map(order => ({
          ...order,
          services: order.services.join(", "),
        }));
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }
  createWorkProgress(order: any) {
    this.sharedService.setSelectedOrder(order); // Store order
    this.router.navigate(['/working-progress']); // Navigate
  }
  
}
  