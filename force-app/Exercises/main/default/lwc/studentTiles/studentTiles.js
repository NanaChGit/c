import { api } from 'lwc';
import { LightningElement } from 'lwc';

export default class StudentTiles extends LightningElement {
    @api studentList = []; 
}