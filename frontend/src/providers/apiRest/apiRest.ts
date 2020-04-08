import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


interface message {
    id : string
    message : string
    username : string
    createdAt : Date
  }

@Injectable()
export class apiRestProvider {

    url: string = 'https://us-central1-tmup-908e4.cloudfunctions.net/app/';

    constructor (private http: HttpClient, private db: AngularFirestore){
    }

    getTeams(){
        return this.http.get(this.url+'teams');
    }

    createTeam(teamData) {
        console.log(JSON.stringify(teamData));
        return new Promise(resolve => {
            this.http.post(this.url+'teams/create', JSON.stringify(teamData))
            .subscribe(data => {
                resolve(data);
            })
        })
    }

    createMembership(data: JSON) {
        return new Promise(resolve => {
            this.http.post(this.url+'membership/create', data)
            .subscribe(data => {
                resolve(data);
            });
        })
    }
    createChat(chatInfo){
        return new Promise(resolve => {
            this.http.post(this.url+'chats/create', JSON.stringify(chatInfo))
            .subscribe(data => {
                resolve(data);
            })
        })
    }
    getChat(teamId: string){
        return this.http.get(this.url+'chats/'+teamId);
    }
    getMessages(chatId: string, teamId: string){

        return this.db.collection("teams/6hd6Bdym8CXKW0Sm3hDb/chats/t8qtEbMEcFbflhKlHGsQ/messages").snapshotChanges().pipe(map(mensajes => {
            return mensajes.map(m => {
                const data = m.payload.doc.data() as message;
                data.id = m.payload.doc.id;
                return data;
            })
        }))
        //return this.http.get(this.url+'chats/messages/'+teamId+'/'+chatId);
    }
    createMessage(messageInfo){
        return new Promise(resolve => {
            this.http.post(this.url+'chats/messages/create', JSON.stringify(messageInfo))
            .subscribe(data => {
                resolve(data);
            })
        })
    }
}
