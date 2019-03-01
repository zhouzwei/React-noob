import React, { Component } from 'react';
import './App.css';
import ToDoList from './ToDoList';




class ToDo extends Component {
	// 初始化 data(数据) 值	
	constructor(props){
		super(props);
		this.state={
			items:[
				{title:'选择一',completed:false,id:1},
				{title:'选择二',completed:true,id:2} 
			],
			names:[
				{name:"所有",id:1},
				{name:"有效",id:2},
				{name:"删除",id:3}
			],
			show:0
		} 
	}
	//  增加按钮
	handleSubmit(e){ 
		e.preventDefault();
		let inputValue = this.refs.input.value.trim();
		this.refs.input.value='' 
		if(inputValue===''&& !inputValue) { 
			this.refs.input.focus();
			return alert('不能为空')
		} 
		let date = new Date();
		let newItem={title:inputValue,completed:false,id:date.getTime()}
		this.state.items.push(newItem) 
		this.setState({ 
			items:this.state.items 
		})　
	}
	// 选择复选框事件(打钩)
	handleComponent(id){
		var newItems = this.state.items
		var index = newItems.findIndex(function(ele){
			return id === ele.id   
		})
		newItems[index].completed = !newItems[index].completed
		this.setState({     
			items:newItems    
		}) 
	}
	// 删除事件(删除当前li)
	handleDel(id){   
		var index = this.state.items.findIndex(function(ele){ 
			return id === ele.id 
		})   
		this.state.items.splice(index,1) 
		this.setState({      
			items:this.state.items    
		}) 
	}
	// tab栏当前状态
	handleShow(id){
		this.setState({show:id}) 		
　	}
	nextPage(){
		window.location.href=""
	}
	
  	render() {
  		var numId = this.state.show;
  		var showItems
  		switch(numId){
			case 0:
				showItems=this.state.items;
				break;
			case 1:
				showItems=this.state.items.filter(function (element) {
					return element.completed === false     
				})
				break;
			case 2:
				showItems=this.state.items.filter(function (element) {
					return element.completed === true     
				})
				break;
			default:
		}
  		
//		if(this.state.show === 0) {
//				var showItems=this.state.items;
//		}else if(this.state.show === 1) {
//			var showItems=this.state.items.filter(function (element) {
//				return element.completed === false     
//			})   
//		}else{
//			var showItems=this.state.items.filter(function (element) {
//				return element.completed === true     
//			})
//		}
		
	  	var button = this.state.names.map( (item,index) =>{
			return(
			  	<button className={[this.state.show === index ? 'tabs_nav ontabs_nav':'tabs_nav']}　key={index} onClick={this.handleShow.bind(this,index)} >
			  		{item.name}
				</button>
			)
	  	})
	  	// 判断input框 是否有 completed
	  	var newlen = this.state.items.filter( function(e){
	  			return e.completed === false 
	  	}).length;
	  	
	  	return (
	  		<div>
			    <h1 className="textcenter">Todo</h1>
			  	<form className="table_form" onSubmit={this.handleSubmit.bind(this)}>
			      	<input className="change_input" placeholder="add a todo" ref="input"/>
			      	<button className="add_btn" >add</button>
				</form>
							
				<ToDoList items={showItems} handleComponent={this.handleComponent.bind(this)} handleDel={this.handleDel.bind(this)} />
				
				<div className="tabs">
					<div className="state_length">{newlen}条数据</div>
					{button}
				</div>
				<div className="next_page" onClick={this.nextPage.bind(this)}>下一页</div>
			</div>
	    )
  	}
}

export default ToDo;
