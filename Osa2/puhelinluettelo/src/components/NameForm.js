const NameForm = (props) => {

    <form onSubmit={props.addPerson}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameAdd}    
           />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberAdd}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

}