import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';

export default class FormToastNavigation extends NavigationMixin(LightningElement) {
    //método que deverá ser acionado em caso de sucesso na criação do registro
    handleSuccess(event){
        console.log('Conta criada');
        
        this.recordId = event.detail.id;

        /**montar uma const com o evento e seus parametros */
        const toastEvent = new ShowToastEvent({
            title: 'Para Bens',
            message: 'A conta ' + event.detail.id + ' foi  criada com sucesso!',
            variant: 'success'
        });

        //dispara o evento
        this.dispatchEvent(toastEvent);
        console.log('Id da Conta' + event.detail.id);
        
        /** realizar o direcionamento*/
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });

    }
    //limpa os campos do formulário
    handleReset() {
        //seleciona todos os elementos lightning-input-field
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );

        //se possuir dados, para cada campo aplicar o reset
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
}