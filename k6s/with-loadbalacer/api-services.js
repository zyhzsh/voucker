import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';
export let option ={
  stages:[
    {duration:'1m',target:2000},
    {duration:'9m',target:2000},
    {duration:'7m',target:10000},
    {duration:'10m',target:0},
  ]
}
export default function(){
 // http.get('http://35.240.37.210:3000/api/location');
    http.get('http://35.189.216.65:3000/api/category');

   sleep(3);
}