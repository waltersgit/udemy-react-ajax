/**
 * Created by peter on 2018/3/28.
 */
import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';
class Posts extends Component{
    state = {
        posts: []
    }
    componentDidMount(){
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
                const updatePosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatePosts});
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            })
    }
    postSelectedHandler = (id) => {
        // this.setState({selectedPostId: id});
        // this.props.history.push({pathname: '/' + id})
        this.props.history.push('/posts/' + id)
    }
    render () {
        let posts = <p style={{textAlign: 'center'}}>
            Something went wrong
        </p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return  <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={()=>this.postSelectedHandler(post.id)}/>;
            })
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;