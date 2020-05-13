import React, {Component} from 'react';
import api from '../services/api';

import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

export default class Main extends Component {
  static navigationOptions = {
    title: 'VlanJs',
  };

  state = {
    productInfo: {},
    docs: [],
    page: 1,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const {docs, ...productInfo} = response.data;

    this.setState({docs: [...this.state.docs, ...docs], productInfo, page});
  };

  loadMore = () => {
    const {page, productInfo} = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };

  renderItem = ({item}) => (
    <View style={style.productContainer}>
      <Text style={style.productTitle}>{item.title}</Text>
      <Text style={style.productDescription}>{item.description}</Text>

      <TouchableOpacity style={style.productButton} onPress={() => {}}>
        <Text style={style.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={style.container}>
        <FlatList
          contentContainerStyle={style.list}
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  list: {
    padding: 20,
  },

  productContainer: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },

  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#e55039',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  productButtonText: {
    fontSize: 16,
    color: '#e55039',
    fontWeight: 'bold',
  },
});
