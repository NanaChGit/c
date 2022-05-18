public with sharing class StudentBrowserForm {
    @AuraEnabled(cacheable=true) 
    public static List<Account> getInstructors() { 
       	return [SELECT Id, Name FROM Account ORDER BY Name];// WHERE Is_Instructor__c = true 
    }

    @AuraEnabled(cacheable=true) 
    public static List<Contact> getDeliveriesByInstructor(String instructorId ) { 
        if (instructorId == '') {
			return new List<Contact>();
		} else {
			return [
				SELECT Id,Name FROM Contact WHERE AccountId =: instructorId
				/*SELECT Id, Start_Date__c, Location__c, Attendee_Count__c
				FROM Course_Delivery__c
				WHERE Instructor__c = :instructorId AND Status__c IN ('Enrolled','Completed','Delivered','Scheduled')
				ORDER BY Start_Date__c DESC*/
			];
		}
    }
}
