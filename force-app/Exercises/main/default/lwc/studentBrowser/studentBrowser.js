import { LightningElement,api,track,wire} from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents'; 
import { fireEvent } from 'c/pubsub'; 
import { CurrentPageReference } from 'lightning/navigation';
export default class StudentBrowser extends LightningElement {
    selectedDeliveryId = ''; 
    selectedInstructorId = '';
    @wire(getStudents, { instructorId: '$selectedInstructorId', courseDeliveryId: '$selectedDeliveryId'}) students;
    handleFilterChange(event){ 
        this.selectedDeliveryId = event.detail.deliveryId; 
        this.selectedInstructorId = event.detail.instructorId; 
    }

    @wire(CurrentPageReference) pageRef;
    handleStudentSelected(event){ 
        const studentId = event.detail.studentId; 
        this.updateSelectedStudent(studentId); 
    }
    
    updateSelectedStudent(studentId){ 
        fireEvent(this.pageRef, 'studentChange', { studentId }); 
    }

   /*@track studentList = [];

    constructor() { 
    super(); 
    const studentNames = ['Rad', 'Stuart', 'Andres', 'Rahul', "Amit", "Simon"]; 
    studentNames.forEach((studentName, index) => { 
    this.studentList.push( 
    { 
        'sobjectType' : 'Contact', 
        'Name' : studentName, 
        'PhotoUrl': '/services/images/photo/003B0FakePictId', 
        'Id' : index 
    } 
    ); 
 }) 
}*/

}