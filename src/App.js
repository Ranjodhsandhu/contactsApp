import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsApi from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    contacts: [],
    screen: 'list'
  }
  componentDidMount(){
    ContactsApi.getAll()
    .then((contacts)=>{
      this.setState(()=>({
        contacts
      }))
    })
  }

  removeContact= (contact)=>{
    this.setState((currentState)=>({
      contacts: currentState.contacts.filter((c)=>{
        return  c.id !== contact.id
      })
    })
    )
    ContactsApi.remove(contact);
  }
  render() {
    return (
      <div>
        {this.state.screen==="list" && 
        <ListContacts 
          contacts={this.state.contacts}
          removeContact = {this.removeContact}
        />
        }
        {this.state.screen === "create" && <CreateContact />}
      </div>
    )
  }
}

export default App;
