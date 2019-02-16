import React from 'react';
import ReactDOM from 'react-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class TodoApp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			todos : [
			{
				id: 1,
				item: 'item One'
			},
			{
				id: 2,
				item: 'item Two'
			}
			],
			uid: 3
		}
	this.handleAddtodo = this.handleAddtodo.bind(this);
	this.handleDelTodo = this.handleDelTodo.bind(this);
	this.handleEditTodo = this.handleEditTodo.bind(this);
	}
	
	handleAddtodo(data){
		var oldArray = this.state.todos.slice();  
		var newArray = {
			 id:this.state.uid, 
			 item: data 
		}  
		oldArray.push(newArray);  
		this.setState({ todos: oldArray , uid:this.state.uid+1})
	}
	handleDelTodo(id){
		var result = this.state.todos.filter((todobj) => {
			return todobj.id !== id;
		});
		this.setState({ todos: result});
	}
	handleEditTodo(id){
		
	}
	
	render() {
		return(
			<div>
				<Heading />
				<InputText handleSubmitPrnt={this.handleAddtodo} />
				<ViewTodo todos={this.state.todos} handleDeletePrnt={this.handleDelTodo} handleEditPrnt={this.handleEditTodo} />
			</div>
		);
	}
}
class Heading extends React.Component {
	render(){
		return(
			<div className="heading"> 
				<span>Todo App </span>
			</div>
		);
	}
}

class InputText extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			todo: ''
		}
		this.handleTodo = this.handleTodo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleTodo(e){
		this.setState({ todo: e.target.value});
	}
	handleSubmit(){
		if(this.state.todo){
			this.props.handleSubmitPrnt(this.state.todo);
			this.setState({todo: ''});
		}
	}
	render(){
		return(
			<div>
				<div className="todoInput">
					<input type="text" value={this.state.todo} onChange={this.handleTodo} name="todoname" />
				</div>
				<div className="todoBtn">
					<input type="button" onClick={this.handleSubmit} value="Add Todo" />
				</div>
			</div>
		);
	}
}

class ViewTodo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			todos : this.props.todos,
			isEditable: '',
			editedTodo: '',
			showeditBtn: true
		}
		this.handleEdtChng = this.handleEdtChng.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	componentWillReceiveProps(newProps) {
    this.setState({todos: newProps.todos});
}
	handleDelete(id){
		this.props.handleDeletePrnt(id);
	}
	handleEdit(id, item){
		//this.props.handleEditPrnt(id);
		this.setState({isEditable: id});
		this.setState({editedTodo: item});
		//document.getElementByClassName('editBtn').style.display = 'none';
		
	}
	handleEdtChng(e){
		this.setState({editedTodo: e.target.value});
	}
	handleUpdate(){
		this.setState( state => {
			const list = state.todos.map((todobj) => {
				if(todobj.id !== this.state.isEditable){
					return todobj;
				}else{
					todobj.item = this.state.editedTodo;
					return todobj;
				}
			});
			return{
				list,
			}
		});
		this.setState({isEditable: ''});
		this.setState({editedTodo: ''});
	}
	
	render() {
		return(
			this.state.todos.map((todobj) => {
				const editable = (todobj.id !== this.state.isEditable);
				return(
					<div className="editdiv" key={todobj.id}>
							<input type="text" value={editable ? todobj.item : this.state.editedTodo} className={editable ? "border-none" : ""} onChange={this.handleEdtChng} disabled={editable} />
							<button type="button" onClick={this.handleDelete.bind(this, todobj.id)} className="deleteBtn"> X </button>
						{ (editable) ? 
							<button type="button" onClick={this.handleEdit.bind(this, todobj.id, todobj.item)} className="editBtn" >edit</button>
							: 
							<button type="button" onClick={this.handleUpdate} className="updtBtn" >Update</button>
						}
					</div>
			);
			})
			
		);
	}
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));

