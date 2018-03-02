import { Component,OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {isInteger, isNumber} from "@ng-bootstrap/ng-bootstrap/util/util";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    public ProductsList = [];

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        let username = JSON.parse(localStorage.getItem('currentUser')).user.username;
        this.http.get('http://localhost:3000/api/product/getProducts')
            .subscribe((res: any) => {
                this.ProductsList = res.data.filter(ProductsList => ProductsList.sellerName === username);
            });
    }

    delete(product) {


        this.http.delete('http://localhost:3000/api/product/deleteProduct/' + product._id).subscribe(res =>{
            this.ProductsList.splice(this.ProductsList.indexOf(product),1);});


    }

    create(name, price){
        let username = JSON.parse(localStorage.getItem('currentUser')).user.username;
        const product = {
            name: name,
            price: price,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            sellerName: username
        }

        this.http.post('http://localhost:3000/api/product/createProduct/', product).subscribe(
            res =>{ this.ProductsList = this.ProductsList.concat(product);});

    }

    update(name, price, product) {
        let username = JSON.parse(localStorage.getItem('currentUser')).user.username;
        if (name == "") {
            name = product.name;
        }

        if (price.toString() == "" || price.isPrototypeOf(Number)) {
            price = product.price;
        }
        const newProduct = {
            name: name,
            price: price,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            sellerName: username
        }
        this.ProductsList[this.ProductsList.indexOf(product)].name=name;
        this.ProductsList[this.ProductsList.indexOf(product)].price=price;
        this.http.patch('http://localhost:3000/api/product/updateProduct/' + product._id, newProduct).subscribe();

    }

    myFunction(name) {
        var x = document.getElementById(name);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

    }

}