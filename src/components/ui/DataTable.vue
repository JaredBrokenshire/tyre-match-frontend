<template>
  <div class="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">

        <!-- Header -->
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="(col, index) in columns"
              :key="index"
              :style="{ width: col.width || 'auto' }"
              class="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="(row, rowIndex) in $props.data"
            :key="rowIndex"
            class="hover:bg-gray-50 transition cursor-pointer"
            @click="goToRow(row)"
          >
            <td
              v-for="(col, colIndex) in columns"
              :key="colIndex"
              class="px-3 py-2 whitespace-nowrap text-sm text-gray-700"
            >
              <!-- Custom cell slot support -->
              <slot
                :name="col.field"
                :row="row"
              >
                {{ getValue(row, col.field) }}
              </slot>
            </td>
          </tr>

          <tr v-if="$props.data.length === 0">
            <td
              :colspan="columns.length"
              class="text-center py-10 text-sm text-gray-400"
            >
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
      <p class="text-sm text-gray-600">
        Page <span class="font-medium">{{ currentPage }}</span>
        of <span class="font-medium">{{ totalPages }}</span>
      </p>

      <div class="flex gap-2">
        <button
          :disabled="currentPage === 1"
          class="px-3 py-1 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50"
          @click="changePage(currentPage - 1)"
        >
          Prev
        </button>

        <button
          :disabled="currentPage === totalPages"
          class="px-3 py-1 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DataTable",
    props: {
      columns: {
        type: Array,  // [{label: "label", field: "field", width: "10%"}, ...]
        required: true,
      },
      data: {
        type: Array,
        required: true
      },
      pageSize: {
        type: Number,
        default: 10
      },
      rowLink: {
        type: Function,
        default: null
      },
      totalCount: {
        type: Number,
        default: 20,
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalCount / this.pageSize);
      },
    },
    methods: {
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('change-page', page);
        }
      },
      getValue(row, field) {
        return field.split(".").reduce((acc, key) => acc?.[key], row);
      },
      goToRow(row) {
        if (!this.rowLink) return;

        const url = this.rowLink(row);
        if (url) this.$router.push(url);
      }
    }
  };
</script>