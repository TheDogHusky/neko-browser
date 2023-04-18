<template>
  <div class="tab-container">
      <div class="tab">
          <div class="tabid">
              <h4 class="tabname">Tabname</h4>
          </div>
          <button class="tabcloser"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="tab selected">
          <div class="tabid">
              <h4 class="tabname">Tabname Selected</h4>
          </div>
          <button class="tabcloser"><i class="bi bi-x-lg"></i></button>
      </div>
  </div>
  <div class="toolbar-container">
      <div class="tools">
          <div class="tools-right">
              <button class="btn btn-toolbar"><i class="bi bi-arrow-left"></i></button>
              <button class="btn btn-toolbar"><i class="bi bi-arrow-right"></i></button>
              <button class="btn btn-toolbar"><i class="bi bi-arrow-counterclockwise"></i></button>
              <button class="btn btn-toolbar"><i class="bi bi-house"></i></button>
          </div>
          <div class="tools-center">
              <div class="urlbar"></div>
          </div>
          <div class="tools-left">
              <button class="btn btn-toolbar"><i class="bi bi-search"></i></button>
              <button class="btn btn-toolbar"><i class="bi bi-list"></i></button>
          </div>
      </div>
  </div>
</template>

<script setup>
  //import {ref} from "vue";
  import "./styles/main.css";

</script>


