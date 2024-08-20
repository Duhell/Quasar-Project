<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProductStore } from '../stores/product';

const productStore = useProductStore();

interface Props {
  isOpen?: boolean;
  backdropFilter?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  backdropFilter: 'brightness(60%)',
});

const isOpen = ref(props.isOpen);

watch(
  () => props.isOpen,
  (updatedVal) => {
    isOpen.value = updatedVal;
  }
);
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      persistent
      v-model="isOpen"
      :backdrop-filter="props.backdropFilter"
    >
      <q-card style="width: 400px; max-width: 80vw">
        <q-card-section
          class="row items-center q-pb-none text-subtitle1 text-weight-medium"
        >
          Update Form
        </q-card-section>

        <q-form class="q-gutter-sm">
          <q-input filled v-model="productStore.data.title" label="Title" />
          <q-input filled v-model="productStore.data.sku" label="SKU" />
          <q-input
            filled
            type="textarea"
            v-model="productStore.data.description"
            label="Description"
          />
          <q-input
            filled
            v-model="productStore.data.category"
            label="Category"
          />
          <q-input
            filled
            type="number"
            v-model="productStore.data.price"
            label="Price"
          />
          <q-input
            filled
            type="number"
            v-model="productStore.data.rating"
            label="Total Rating"
          />
        </q-form>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="productStore.closeModal()"
          />
          <q-btn
            flat
            label="Update"
            color="primary"
            @click="productStore.updateData()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
form {
  padding: 1em;
}
</style>
