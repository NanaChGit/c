import { LightningElement,api,track,wire } from 'lwc';
import getInstructors from '@salesforce/apex/StudentBrowserForm.getInstructors';
import getDeliveriesByInstructor from '@salesforce/apex/StudentBrowserForm.getDeliveriesByInstructor'; 

export default class StudentBrowserForm extends LightningElement {
    //111111111111111111111111111-------------------------------------
    @track instructors = []; 
    error; 



    @wire(getInstructors) 
    wired_getInstructors({ error, data }) { 
        this.instructors = []; 
        if (data) { 
            this.instructors.push({ 
                value: '', 
                label: 'Select an instructor' 
            }); 
            data.forEach(instructor => { 
                this.instructors.push({ 
                    value: instructor.Id, 
                    label: instructor.Name 
                }); 
            }); 
        } else if (error) { 
            this.error = error; 
        }
    }

  //22222222222222222222222222222222222222222222222222222222222222222222222
    selectedInstructorId = ''; 
    @track deliveries = [];
    selectedDeliveryId = '';
    @wire(getDeliveriesByInstructor, {instructorId : '$selectedInstructorId'})
    wired_getDeliveriesByInstructor({ error, data }) { 
	    this.deliveries = [];
	    if (data && data.length) {
		    if (this.selectedInstructorId) {
			    this.deliveries.push({
				    value: '',
				    label: 'Any delivery'
			    });
		    }
		    data.forEach(delivery => {
			    this.deliveries.push({
				    value: delivery.Id,
				    label: `${delivery.Id} ${delivery.Name} students`
			    });
		    });
	    } else if (error) {
		    this.error = error;
	    }
    }

    //33333-------------------------------------------------
    onInstructorChange(event) { 
        this.selectedDeliveryId = ''; 
        this.selectedInstructorId = event.target.value; 
        this.notifyParent();
    }

    onDeliveryChange(event) {
        this.selectedDeliveryId = event.target.value; 
        this.notifyParent();
    }

    notifyParent() { 
        const evt = new CustomEvent('filterchange', { 
            detail: { 
                instructorId: this.selectedInstructorId, 
                deliveryId: this.selectedDeliveryId, 
            } 
        }); 
        this.dispatchEvent(evt); 
    }
}
