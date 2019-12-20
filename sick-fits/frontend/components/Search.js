import Downshift from 'downshift';
import React, { Component } from 'react';
import Router from 'next/router';
import { ApolloConsumer, Query } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import Link from 'next/link';


const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
      id
      image
      title
    }
  }
`;
// function routeToItem(item) {
//     console.log(item)
//     Router.push({
//       pathname: '/item',
//       query: {
//         id: item.id,
//       },
//     });
//   }

class Search extends Component {
    state={
        items:[],
        loading: false,
    }
    onChange = debounce(async (e, client ) =>{
        
        this.setState({ loading: true})
        
        const res = await client.query({
            query: SEARCH_ITEMS_QUERY,
            variables: {searchTerm: e.target.value}
        })
        
        this.setState({ 
            items: res.data.items,
            loading: false
        })
        console.log(this.state);
    }, 350);


    render() {
        return (
            <Downshift>


                {({getInputProps, getItemProps, isOpen, inputValue, highlightedIndex})=>(

               
                    <div className="search">
                        <ApolloConsumer>

                            {client=>(
                                <input 
                                type="search" 
                                {...getInputProps({
                                    type: 'search',
                                    placeholder: 'Search For An Item',
                                    id: 'search',
                                    className: this.state.loading ? 'loading' : '',
                                    onChange: e => {
                                      e.persist();
                                      this.onChange(e, client);
                                    },
                                  })}
                                />
                            )}

                        </ApolloConsumer>
                        
                        
                        {isOpen && (
                        <div className="search-results">
                            {this.state.items.map((item)=>{
                                var itemID = item.id
                                console.log(itemID, '<---')
                                return(
                                    <Link key={itemID} href={"/item?id=" + itemID}><a>{item.title}</a></Link>

                                )
                            })}
                        </div>
                        )}


                    </div>


             )}
            </Downshift>
        );
    }
}

export default Search;