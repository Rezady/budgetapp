<?php

namespace App\Http\Controllers;

use App\Tracking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InputController extends Controller
{
    // menampilkan database
    public function show()
    {
        $track = Tracking::latest()->get();
        return response([
            'success' => true,
            'message' => 'List Semua tracking',
            'data' => $track
        ], 200);
    }

    // menyimpan ke database
    public function store(Request $request)
    {
        //validate data
        $validator = Validator::make(
            $request->all(),
            [
                'tanggal'     => 'required',
                'tipe'   => 'required',
                'kategori'   => 'required',
                'jumlah'   => 'required',
            ],
            [
                'tanggal.required' => 'Masukkan tanggal !',
                'tipe.required' => 'Masukkan tipe !',
                'jumlah.required' => 'Masukkan jumlah !',
                'kategori.required' => 'Masukkan kategori !',
            ]
        );

        if ($validator->fails()) {

            return response()->json([
                'success' => false,
                'message' => 'Silahkan Isi Bidang Yang Kosong',
                'data'    => $validator->errors()
            ], 400);
        } else {
            $post = Tracking::create([
                'tanggal'     => $request->input('tanggal'),
                'tipe'     => $request->input('tipe'),
                'kategori'   => $request->input('kategori'),
                'jumlah'   => $request->input('jumlah')
            ]);

            if ($post) {
                return response()->json([
                    'success' => true,
                    'message' => 'Post Berhasil Disimpan!',
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Post Gagal Disimpan!',
                ], 400);
            }
        }
    }

    // mengupdate database
    public function update(Request $request)
    {
        //validate data
        $validator = Validator::make(
            $request->all(),
            [
                'tanggal'     => 'required',
                'tipe'   => 'required',
                'kategori'   => 'required',
                'jumlah'   => 'required',
            ],
            [
                'tanggal.required' => 'Masukkan tanggal !',
                'tipe.required' => 'Masukkan tipe!',
                'jumlah.required' => 'Masukkan jumlah !',
                'kategori.required' => 'Masukkan kategori !',
            ]
        );

        if ($validator->fails()) {

            return response()->json([
                'success' => false,
                'message' => 'Silahkan Isi Yang Kosong',
                'data'    => $validator->errors()
            ], 400);
        } else {

            $tracking = Tracking::whereId($request->input('id'))->update([
                'tanggal'   => $request->input('tanggal'),
                'tipe'     => $request->input('tipe'),
                'jumlah'   => $request->input('jumlah'),
                'kategori'   => $request->input('kategori'),
            ]);


            if ($tracking) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data Berhasil Diupdate!',
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data Gagal Diupdate!',
                ], 500);
            }
        }
    }

    // delete data
    public function deleteData($id)
    {
        $tracking = Tracking::findOrFail($id);
        $tracking->delete();

        if ($tracking) {
            
            return response()->json([
                'success' => true,
                'message' => 'Data Berhasil Dihapus!',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data Gagal Dihapus!',
            ], 500);
        }
    }
}
