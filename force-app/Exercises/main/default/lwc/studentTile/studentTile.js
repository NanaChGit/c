import { LightningElement, api} from 'lwc';

export default class StudentTile extends LightningElement {
    @api student={
        Name: 'Nana', 
        PhotoUrl: '/services/images/photo/003B0FakePictId',
    };
    @api selected = false; 
}