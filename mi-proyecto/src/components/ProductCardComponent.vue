<template>
  <div class="card h-100">
    <img :src="product.image" class="card-img-top" style="object-fit:cover; height:180px;">
    <div class="card-body d-flex flex-column">
      <h6 class="card-title">{{ product.title }}</h6>
      <p class="mb-2 text-truncate">{{ product.description }}</p>
      <div class="mt-auto">
        <div class="d-flex justify-content-between align-items-center">
          <strong>${{ product.price }}</strong>
          <button @click="$emit('details', product)" class="btn btn-sm btn-outline-primary">Detalles</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>
