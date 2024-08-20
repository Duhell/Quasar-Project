<script setup lang="ts">
import EditModal from '../components/EditModal.vue';
import DeleteModal from '../components/DeleteModal.vue';
import { ref, onMounted } from 'vue';
import { TableColumn } from '../components/model';
import { useProductStore } from '../stores/product';

const productStore = useProductStore();
const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  try {
    await productStore.loadData();
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
});

const filterCol = ref<string[]>([
  'id',
  'sku',
  'title',
  'description',
  'category',
  'price',
  'rating',
]);

const cols: TableColumn[] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: (row) => row.id,
    sortable: true,
  },
  {
    name: 'sku',
    align: 'left',
    label: 'SKU',
    field: (row) => row.sku,
  },
  {
    name: 'title',
    align: 'left',
    label: 'Title',
    field: (row) => row.title,
  },
  {
    name: 'description',
    align: 'left',
    label: 'Description',
    field: (row) => row.description,
  },
  {
    name: 'category',
    align: 'left',
    label: 'Category',
    field: (row) => row.category,
    format: (val) => `${val.charAt(0).toUpperCase() + val.slice(1)}`,
  },
  {
    name: 'price',
    align: 'left',
    label: 'Price',
    field: (row) => row.price,
    format: (val) => `$ ${val}`,
    sortable: true,
  },
  {
    name: 'rating',
    align: 'left',
    label: 'Total Rating',
    field: (row) => row.rating,
    sortable: true,
  },
  {
    name: 'action',
    align: 'center',
    label: 'Action',
    field: (row) => row.id,
    format: () => '',
  },
];
</script>

<template>
  <q-page padding>
    <q-table
      flat
      bordered
      :rows="productStore.fetchedData"
      :columns="cols"
      row-key="id"
      :loading="loading"
      :visible-columns="filterCol"
    >
      <template v-slot:top>
        <q-space />
        <q-select
          v-model="filterCol"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="cols"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />
      </template>

      <template v-slot:loading>
        <q-inner-loading label="Please wait..." showing color="primary" />
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div>
            <q-btn-group flat>
              <q-btn
                flat
                size="10px"
                color="blue"
                @click="productStore.editProduct(props.row)"
                rounded
                icon="edit"
              />
              <q-btn
                flat
                size="10px"
                color="red"
                @click="productStore.deleteProduct(props.row)"
                rounded
                icon="delete"
              />
            </q-btn-group>
          </div>
        </q-td>
      </template>
    </q-table>

    <edit-modal :isOpen="productStore.isOpenModalEdit" />
    <delete-modal :isOpen="productStore.isOpenModalDelete" />
  </q-page>
</template>
