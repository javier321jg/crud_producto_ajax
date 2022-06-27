/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.ProductoJpa.repository;

import com.example.ProductoJpa.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Litman
 */
public interface ProductoRepository extends JpaRepository<Producto, Integer>{
    
}
