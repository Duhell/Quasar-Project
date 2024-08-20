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
      <q-card style="width: 300px; max-width: 80vw">
        <div>
          <p class="text-subtitle2">
            Are you sure to delete {{ productStore.data.title }}?
          </p>
        </div>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="productStore.closeModal()"
          />
          <q-btn
            flat
            label="Delete"
            color="negative"
            @click="productStore.destroyData()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.q-card {
  padding: 1.5em;
}
</style>
