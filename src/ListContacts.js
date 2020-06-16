import React,{Component} from 'react';
import PropTypes from 'prop-types';

class ListContacts extends Component{
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        removeContact: PropTypes.func.isRequired,
    }
    state = {
        query:''
    }
    updateQuery = (text)=>{
        this.setState(() => ({
            query: text
        })
        )
    }
    handleChange = (event)=>{
        const text = event.target.value;
        this.updateQuery(text);
    }
    clearQuery = () =>{
        this.updateQuery('');
    }
    render(){
        const {query} = this.state;
        const {contacts, removeContact} = this.props;
        const showingContacts = query === ''
        ? contacts
        : contacts.filter((c)=>{
            return c.name.toLowerCase().includes(query);
        })
        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input 
                        type="text"
                        className="search-contacts"
                        placeholder ="Search Contacts"
                        value={query}
                        onChange={this.handleChange}
                    />
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {
                        showingContacts.map((contact) => (
                            <li key={contact.id} className='contact-list-item'>
                                <div className='contact-avatar' style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}>
                                </div>
                                <div className='contact-details'>
                                    <p>{contact.name}</p>
                                    <p>{contact.handle}</p>
                                </div>
                                <button
                                    onClick={() => removeContact(contact)}
                                    className='contact-remove'>
                                    Remove
                    </button>
                            </li>
                        ))
                    }
                </ol>
            </div>
        )
    }
}

export default ListContacts;