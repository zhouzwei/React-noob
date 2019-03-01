import React, { Component } from 'react';
import './App.css';

class ToDoList extends Component {
	// 选择复选框事件(打钩)	
	handleChange(id){ 
		this.props.handleComponent(id)
	}
	// 删除事件
	handleDelete(id){
　  		this.props.handleDel(id)
	} 

	render() {   
		let list = this.props.items.map( item =>{
			return(
				<div key={item.id} className="li">
					<input className="checkbox" type="checkbox" checked={item.completed} onChange={this.handleChange.bind(this,item.id)} />
					<span className="item_title" style={item.completed ? {textDecoration: 'line-through',color:'#999'}:null}>{item.title}</span>
					<button className="del_btn" onClick={this.handleDelete.bind(this,item.id)} >删除</button>
				</div>
			)			
		})   

		return (
			<div className="list_item">
				{list}
			</div>
		)  
	}
}

export default ToDoList;
