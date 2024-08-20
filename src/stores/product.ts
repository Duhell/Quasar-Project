import { defineStore } from 'pinia';
import { Product } from 'src/components/model';
import { Notify } from 'quasar';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    fetchedData: [] as Product[],
    data: {} as Product,
    isOpenModalEdit: false as boolean,
    isOpenModalDelete: false as boolean,
  }),
  getters: {
    editProduct: (state) => (product: Product) => {
      state.isOpenModalEdit = true;
      const data = { ...product };
      return (state.data = data);
    },
    deleteProduct: (state) => (product: Product) => {
      state.isOpenModalDelete = true;
      return (state.data = product);
    },
  },
  actions: {
    async loadData() {
      const response = await axios.get('https://dummyjson.com/products');
      this.fetchedData = response.data.products;
    },
    updateData() {
      try {
        const index = this.fetchedData.findIndex(
          (product) => product.id === this.data.id
        );
        if (index !== -1) {
          this.fetchedData[index] = this.data;
          Notify.create({
            color: 'positive',
            icon: 'thumb_up',
            message: 'Update Successfully.',
            position: 'top-right',
          });
        }
      } catch (error) {
        Notify.create({
          color: 'negative',
          icon: 'report_problem',
          message: 'Failed to update.' + error,
          position: 'top-right',
        });
      } finally {
        this.closeModal();
      }
    },
    destroyData() {
      // DB transaction
      try {
        this.fetchedData = this.fetchedData.filter(
          (product) => product.id !== this.data.id
        );
        // assumed success
        Notify.create({
          color: 'positive',
          icon: 'thumb_up',
          message: 'Deleted Successfully.',
          position: 'top-right',
        });
      } catch (error) {
        Notify.create({
          color: 'negative',
          icon: 'report_problem',
          message: 'Failed to delete.' + error,
          position: 'top-right',
        });

        // DB rollback
      } finally {
        this.closeModal();
      }
    },
    closeModal() {
      this.isOpenModalEdit = false;
      this.isOpenModalDelete = false;
      return (this.data = {} as Product);
    },
  },
});
